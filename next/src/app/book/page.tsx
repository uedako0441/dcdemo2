// app/予約リスト/page.tsx

import React from 'react';

// 予約データの例
const reservations = [
  { id: 1, name: "田中 太郎", date: "2024-12-21 18:00", numberOfPeople: 2 },
  { id: 2, name: "鈴木 次郎", date: "2024-12-21 19:00", numberOfPeople: 3 },
  { id: 3, name: "佐藤 花子", date: "2024-12-22 20:00", numberOfPeople: 1 },
];

const ReservationList = () => {
  return (
    <div>
      <h1>予約リスト</h1>
      <table>
        <thead>
          <tr>
            <th>予約者名</th>
            <th>予約日時</th>
            <th>人数</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.name}</td>
              <td>{reservation.date}</td>
              <td>{reservation.numberOfPeople}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;