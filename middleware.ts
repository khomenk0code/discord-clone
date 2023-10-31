import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/api/uploadthing'],
})

export const config = {
    clerk: {
        matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    },
}
