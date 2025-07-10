import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const holdersData = [
  { date: '2024-06-01', holders: 32 },
  { date: '2024-06-04', holders: 47 },
  { date: '2024-06-07', holders: 52 },
  { date: '2024-06-10', holders: 61 },
  { date: '2024-06-13', holders: 68 },
  { date: '2024-06-16', holders: 78 },
];

const burnedData = [
  { date: '2024-06-01', burned: 0 },
  { date: '2024-06-04', burned: 250 },
  { date: '2024-06-07', burned: 410 },
  { date: '2024-06-10', burned: 700 },
  { date: '2024-06-13', burned: 1024 },
  { date: '2024-06-16', burned: 1118 },
];

const transfersData = [
  { date: '2024-06-01', txs: 5 },
  { date: '2024-06-04', txs: 12 },
  { date: '2024-06-07', txs: 20 },
  { date: '2024-06-10', txs: 17 },
  { date: '2024-06-13', txs: 23 },
  { date: '2024-06-16', txs: 27 },
];

export default function PinvCharts() {
  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "48px auto" }}>
      <h3 style={{ color: "#61a5fb", marginBottom: 22, textAlign: "center" }}>Statystyki PulseInvest</h3>
      <div style={{ marginBottom: 38 }}>
        <b>Liczba holderów</b>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={holdersData}>
            <CartesianGrid stroke="#233" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="holders" name="Holders" stroke="#41e0cc" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginBottom: 38 }}>
        <b>Spalone tokeny (łącznie)</b>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={burnedData}>
            <CartesianGrid stroke="#233" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="burned" name="Burned" stroke="#fbb97c" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <b>Ilość transakcji dziennie</b>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={transfersData}>
            <CartesianGrid stroke="#233" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="txs" name="Transakcje" stroke="#e64b7a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
