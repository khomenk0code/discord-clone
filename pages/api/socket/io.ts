import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIo } from '@/types'
import { NextApiRequest } from 'next'

export const config = {
    api: {
        bodyParser: false,
    },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io'
        const httpServer: NetServer = res.socket.server as any
        res.socket.server.io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        })
    }
}

export default ioHandler
