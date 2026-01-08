import { useState } from "react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyze = async () => {
        setLoading(true);
        setData(null);

        const res = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });

        const result = await res.json();
        setData(result);
        setLoading(false);
    };

    return (
        <div style={{ padding: 40, fontFamily: "Arial" }}>
            <h2>SEO Analyzer</h2>

            <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: 300, padding: 8 }}
            />

            <button onClick={analyze} style={{ marginLeft: 10, padding: 8 }}>
                Analyze
            </button>

            {loading && <p>Analyzing...</p>}
            {data?.error && (
                <p style={{ color: "red", marginTop: 20 }}>
                    {data.error}
                </p>
            )}
            {data && (
                <pre style={{ marginTop: 20 }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}
