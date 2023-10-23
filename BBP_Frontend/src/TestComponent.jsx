import { useEffect } from "react";

function TestComponent() {
  useEffect(() => {
    fetch("http://localhost:8080/api/booking/getTableBookingDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableId: 3,
        bookDate: "22/10/2023",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <h1>abc</h1>;
}

export default TestComponent;
