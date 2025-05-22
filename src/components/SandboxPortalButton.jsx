'use client';

import React from 'react';

export default function SandboxPortalButton({ className = '', variant = 'primary', size = 'medium', showIcon = true, label = 'Manage Subscription' }) {
  // Direct link to the Paddle sandbox customer portal
  const portalUrl = 'https://sandbox-customer-portal.paddle.com/cpl_01jqppqpftkjwppfthwevb3h64?customer_email=testemailuser89%40gmail.com&customer_id=ctm_01jrhz1tf0r5wx62mx6cby456r&origin-intended=true';
  
  // Set default classes based on variant and size
  let buttonClasses = 'flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Add variant-specific classes
  switch (variant) {
    case 'primary':
      buttonClasses += ' bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      buttonClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500';
      break;
    case 'outline':
      buttonClasses += ' border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500';
      break;
  }
  
  // Add size-specific classes
  switch (size) {
    case 'small':
      buttonClasses += ' text-sm px-3 py-1.5';
      break;
    case 'medium':
      buttonClasses += ' text-base px-4 py-2';
      break;
    case 'large':
      buttonClasses += ' text-lg px-6 py-3';
      break;
  }

  return (
    <a
      href={portalUrl}
      className={`${buttonClasses} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {showIcon && (
        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
      {label}
    </a>
  );
} 