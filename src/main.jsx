import React from 'react'
import {createRoot} from 'react-dom/client'
import {ClerkProvider} from '@clerk/clerk-react'
import {BrowserRouter} from 'react-router-dom'
import ArtistryHubApp from './App'
import './index.css'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Zmx1ZW50LWJsdWVqYXktOS5jbGVyay5hY2NvdW50cy5kZXYk"
if (!publishableKey){
  throw new Error("Missing Clerk Publishable Key")
}

const clerkAppearanceConfig = {
  variables: {
    colorPrimary: '#7e57c2',
    colorTextOnPrimaryBackground: 'white',
  },
  elements: {
    formButtonPrimary: {
      fontSize: '14px',
      fontWeight: '600',
      padding: '10px 20px',
      borderRadius: '8px',
    },
    card: {
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    formFieldInput: {
      borderRadius: '6px',
      padding: '10px 12px',
      fontSize: '16px',
      border: '1px solid #e0e0e0',
    },
    footerActionLink: {
      color: '#7e57c2',
      fontWeight: '600',
    },
    identityPreview: {
      gap: '8px',
      padding: '8px',
      borderRadius: '6px',
    }
  },
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={publishableKey}
      appearance={clerkAppearanceConfig}>
      <BrowserRouter>
        <ArtistryHubApp />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)