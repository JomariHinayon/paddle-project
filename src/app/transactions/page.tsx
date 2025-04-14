'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { identifyPlan } from '@/lib/paddle-utils';
import Link from 'next/link';

const TRANSACTIONS_PER_PAGE = 10;

export default function TransactionsPage() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchTransactions = async (userId: string, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const db = getFirestore();
      const transactionsRef = collection(db, 'users', userId, 'transactions');
      let q = query(
        transactionsRef,
        orderBy('timestamp', 'desc'),
        limit(TRANSACTIONS_PER_PAGE)
      );

      if (isLoadMore && lastDoc) {
        q = query(
          transactionsRef,
          orderBy('timestamp', 'desc'),
          startAfter(lastDoc),
          limit(TRANSACTIONS_PER_PAGE)
        );
      }

      const transactionsSnap = await getDocs(q);
      const logs = transactionsSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
          planDetails: identifyPlan(data.product?.id)
        };
      });

      if (!isLoadMore) {
        setTransactions(logs);
      } else {
        setTransactions(prev => [...prev, ...logs]);
      }

      setLastDoc(transactionsSnap.docs[transactionsSnap.docs.length - 1] || null);
      setHasMore(transactionsSnap.docs.length === TRANSACTIONS_PER_PAGE);
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again.');
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMore = () => {
    if (user?.uid && !loadingMore && hasMore) {
      fetchTransactions(user.uid, true);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchTransactions(user.uid);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
                ← Back to Dashboard
              </Link>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Transaction History
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-slate-600">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="mb-4 text-red-600">{error}</div>
              <button
                onClick={() => user?.uid && fetchTransactions(user.uid)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-2">No transactions found</p>
                  <Link 
                    href="/dashboard" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Return to dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    {transactions.map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div>
                            <p className="text-sm text-slate-500">Plan</p>
                            <p className="font-medium text-slate-900">{transaction.planDetails?.name || 'Unknown Plan'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Amount</p>
                            <p className="font-medium text-slate-900">
                              {transaction.amountPaid} {transaction.currency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Date</p>
                            <p className="font-medium text-slate-900">
                              {transaction.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Status</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                              transaction.paymentStatus === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Transaction ID</p>
                            <p className="text-sm font-mono text-slate-600 break-all">
                              {transaction.paddleTransactionId}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {hasMore && (
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
                      >
                        {loadingMore ? (
                          <span className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            <span>Loading more...</span>
                          </span>
                        ) : (
                          'Load more transactions'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}