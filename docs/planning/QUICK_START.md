# Quick Start Setup Checklist

## 1️⃣ Supabase Setup (5 minutes)

- [ ] Create Supabase account at supabase.com
- [ ] Create new project
- [ ] Copy Project URL
- [ ] Copy Anon Key
- [ ] Create `.env.local` file with credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_url_here
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
  ```

## 2️⃣ Database Setup (2 minutes)

- [ ] Open `docs/supabase-schema.sql`
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Create new query
- [ ] Copy-paste entire SQL schema
- [ ] Execute

## 3️⃣ Verify Installation (2 minutes)

- [ ] Check `package.json` has:
  - ✓ animejs
  - ✓ @supabase/supabase-js
  - ✓ three

- [ ] Run `npm install` to ensure all packages are installed

## 4️⃣ Test Components (5 minutes)

### Test 3D Background
```bash
npm run dev
# Load homepage - should see floating 3D nodes in background
# Scroll down - nodes should rotate and camera should zoom
```

### Test Hero Section
```tsx
// Login with a test user
// Should see "Welcome back, [Name]" message
// Should see progress cards with "Continue where you left off"
```

### Test Glassmorphism
```tsx
// All cards should have frosted glass effect
// Hover effects should show border changes
```

### Test Skill Tree
```tsx
// Navigate to DSE page or add SkillTree component
// Should see connected nodes forming a learning path
```

## 5️⃣ Integrate Auth (10 minutes)

Option A: Use existing AuthContext with Supabase

```typescript
// In your login function:
import { signInUser } from '@/services/authService'

const result = await signInUser({ email, password })
if (result.success) {
  // Update your auth context
  setUser(result.user)
}
```

Option B: Replace with Supabase auth entirely

```typescript
// Update AuthProvider to use Supabase
import { onAuthStateChange } from '@/services/authService'

useEffect(() => {
  const subscription = onAuthStateChange((user) => {
    setUser(user)
  })
  return () => subscription?.unsubscribe()
}, [])
```

## 6️⃣ Add Progress Tracking (5 minutes)

### Add to any page:

```tsx
import ProgressDashboard from '@/components/ProgressDashboard'

export default function YourPage() {
  return <ProgressDashboard />
}
```

### Track progress in code:

```typescript
import { useUpdateProgress } from '@/hooks/useProgress'
import { useAuth } from '@/contexts/AuthContext'

export default function TopicPage() {
  const { user } = useAuth()
  const { updateProgress } = useUpdateProgress(user?.id)

  const handleTopicComplete = async () => {
    await updateProgress('javascript_basics', 'completed')
  }

  return (
    <button onClick={handleTopicComplete}>
      Mark as Complete
    </button>
  )
}
```

## 7️⃣ Test Quiz Recording (5 minutes)

```typescript
import { recordQuizScore } from '@/services/progressService'

// After user completes quiz:
await recordQuizScore(
  userId,
  'javascript_quiz_1',
  85, // score out of 100
  10  // total questions
)
```

## 📊 Verify Everything Works

- [ ] Hero section shows login/logout functionality
- [ ] Progress dashboard displays stats (if logged in)
- [ ] Skill tree renders without errors
- [ ] 3D background animates on scroll
- [ ] Cards have glassmorphism effect
- [ ] Code preview shows syntax highlighting
- [ ] Console shows no errors

## 🎯 First Real User Test

1. Sign up with a test user
2. Profile created automatically ✓
3. Complete a topic
4. Quiz attempt recorded ✓
5. Progress dashboard updates ✓
6. Skill tree shows progress ✓

## 🚀 Deploy to Production

```bash
# Build
npm run build

# Test build locally
npm run start

# Deploy to Vercel
# (if using Vercel hosting)
```

## 💡 Pro Tips

1. **Test RLS policies** - Try accessing another user's data (should fail)
2. **Monitor performance** - 3D background uses requestAnimationFrame, should be smooth
3. **Use Dark Mode** - Glassmorphism looks better in dark theme
4. **Enable Email Auth** - In Supabase dashboard for better UX

## ❌ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| 3D not showing | Check browser WebGL support |
| Auth failing | Verify SUPABASE_URL and ANON_KEY |
| Progress not saving | Check RLS policies in Supabase |
| No real-time updates | Ensure Realtime is enabled in Supabase |
| Slow animations | Reduce 3D quality or disable background on mobile |

## 📞 Support

Check `IMPLEMENTATION_GUIDE.md` for:
- Detailed integration instructions
- Data flow diagrams
- Customization options
- Security considerations
- Troubleshooting guide

---

**Setup Time:** ~30 minutes
**Difficulty:** 🟢 Easy
**Last Updated:** January 20, 2026
