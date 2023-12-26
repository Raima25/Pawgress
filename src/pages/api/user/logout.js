// pages/api/logout.js (in a Next.js application)

export default function handler(req, res) {
    // Clear the token cookie
    res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: 'Logged out successfully' });
}
