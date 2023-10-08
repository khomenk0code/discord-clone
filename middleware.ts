import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/api/uploadthing'],
})
// This example protects all routes including api/trpc routes
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
