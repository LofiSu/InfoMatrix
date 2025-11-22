/**
 * Configuration Check Script
 * Run this to verify your environment setup
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local if it exists
config({ path: resolve(process.cwd(), '.env.local') })

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'CRON_SECRET',
]

const optionalEnvVars = [
  'YOUTUBE_API_KEY',
  'TWITTER_BEARER_TOKEN',
]

function checkConfig() {
  console.log('🔍 Checking InfoMatrix Configuration...\n')
  
  const missing: string[] = []
  const present: string[] = []
  const optional: string[] = []
  
  requiredEnvVars.forEach((varName) => {
    const value = process.env[varName]
    if (!value || value.includes('your-') || value.includes('here')) {
      missing.push(varName)
    } else {
      present.push(varName)
    }
  })
  
  optionalEnvVars.forEach((varName) => {
    const value = process.env[varName]
    if (value && !value.includes('your-') && !value.includes('here')) {
      optional.push(varName)
    }
  })
  
  console.log('✅ Required Environment Variables:')
  if (present.length > 0) {
    present.forEach((varName) => {
      const value = process.env[varName]
      const masked = varName.includes('KEY') || varName.includes('SECRET')
        ? `${value?.substring(0, 8)}...`
        : value
      console.log(`   ✓ ${varName}: ${masked}`)
    })
  } else {
    console.log('   (none configured)')
  }
  
  console.log('\n❌ Missing Required Variables:')
  if (missing.length > 0) {
    missing.forEach((varName) => {
      console.log(`   ✗ ${varName}`)
    })
    console.log('\n⚠️  Please configure these in .env.local')
    console.log('   See scripts/setup-guide.md for instructions')
  } else {
    console.log('   (all configured)')
  }
  
  console.log('\n📋 Optional Variables:')
  if (optional.length > 0) {
    optional.forEach((varName) => {
      console.log(`   • ${varName}: configured`)
    })
  } else {
    console.log('   (none configured - optional for basic functionality)')
  }
  
  console.log('\n📊 Summary:')
  console.log(`   Required: ${present.length}/${requiredEnvVars.length} configured`)
  console.log(`   Optional: ${optional.length}/${optionalEnvVars.length} configured`)
  
  if (missing.length > 0) {
    console.log('\n❌ Configuration incomplete. Please set up .env.local')
    console.log('   Run: cp .env.local.example .env.local')
    console.log('   Then edit .env.local with your credentials')
    process.exit(1)
  } else {
    console.log('\n✅ Configuration looks good!')
    process.exit(0)
  }
}

checkConfig()

