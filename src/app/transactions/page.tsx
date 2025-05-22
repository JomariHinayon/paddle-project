'use client';

<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { Suspense } from 'react';

// Make this route static for export
export const dynamic = "force-static";

// Define transaction interface
interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}

function TransactionsContent() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side code to fetch transactions
    const fetchTransactions = async () => {
      try {
        // In static export, we'll simulate transactions or use a client-side API
        // In a real app, this would fetch from an API endpoint
        setTransactions([
          {
            id: 'txn_sample1',
            date: new Date().toISOString(),
            amount: 19.99,
            status: 'completed',
            description: 'Monthly subscription'
          }
        ]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Transactions</h1>
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : transactions.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-600">You don't have any transactions yet.</p>
        </div>
      )}
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <TransactionsContent />
    </Suspense>
  );
}
>>>>>>> updated
