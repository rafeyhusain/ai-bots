import { NextResponse } from 'next/server';

export class Response {
    static error(error: Error) {
        return Response.send(500, "", error)
    }

    static unauthorized(message: String) {
        return Response.send(401, "Unauthorized")
    }

    static send(statusCode: number, message: String | null = null, error: Error | null = null) {
        switch (statusCode) {
            case 500:
                console.error(message, error);

                return new NextResponse(
                    JSON.stringify({
                        status: "Internal server error",
                        message: `${error?.message}. ${message}`,
                    }),
                    { status: 500 }
                );

            case 401:
                return new NextResponse(
                    JSON.stringify({
                        status: "fail",
                        message: `You are not logged in. ${message}`,
                    }),
                    { status: 401 }
                );

            case 204:
                return new NextResponse(null, {
                    status: 204,
                    headers: {
                        'Content-Length': '0',
                        'Cache-Control': 'no-store',
                    },
                });

            case 200:
                return new NextResponse(
                    JSON.stringify({
                        status: "success",
                        message: `OK. ${message}`,
                    }),
                    { status: 200 }
                );
            default:
                throw new Error(`Unhandled status code ${statusCode}`)
        }
    }
}
