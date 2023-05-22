export const host = 'http://api-shop.alabuga.space/api-shop'

export const sendRequest = async (url, method, headers = {}, body = null) => {
    const response = await fetch(url, {
        method,
        headers,
        body: body && JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}