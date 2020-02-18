export interface PageProps {
    context: PageContextProps
}

export type PageContextProps = {
    userAgent: string
    url: {
        protocol: string,
        host: string
        path: string
    }
}
