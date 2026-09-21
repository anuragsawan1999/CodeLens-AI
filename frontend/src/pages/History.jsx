import { useEffect, useState } from "react";
import API from "../api";

export default function History() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);


  const fetchHistory = async () => {
    const res = await API.get("/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setHistory(res.data);
  };


  useEffect(() => {
    fetchHistory();
  }, []);


  // DELETE
  const deleteItem = async (id) => {
    await API.delete(`/ai/history/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setHistory(history.filter(item => item._id !== id));
  };


  // VIEW FULL
  const viewItem = async (id) => {
    const res = await API.get(`/ai/history/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setSelected(res.data.data);
  };


  return (

    <div style={{ display: "flex", gap: "20px" }}>

      {/* LEFT LIST */}
      <div
  style={{
    flex: 1,
    background: "#161b22",
    padding: "15px",
    borderRadius: "10px",
    height: "80vh",
    overflowY: "auto"
  }}
>

        {/* SEARCH */}
        <input
          placeholder="Search history..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />


        {history
          .filter(item =>
            item.code.toLowerCase().includes(search.toLowerCase())
          )
          .map(item => (

            <div
              key={item._id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                background: "#161b22",
                color: "white",
                borderRadius: "6px"
              }}
            >

              <pre>{item.code.slice(0, 50)}...</pre>


              <button onClick={() => viewItem(item._id)}>
                View
              </button>

              <button onClick={() => deleteItem(item._id)}>
                Delete
              </button>

            </div>

          ))}

      </div>


      {/* RIGHT DETAILS */}
      <div
  style={{
    flex: 1,
    background: "#161b22",
    padding: "15px",
    borderRadius: "10px",
    height: "80vh",
    overflowY: "auto"
  }}
>

        {selected ? (
          <div style={{ background: "#0d1117", padding: "10px" }}>

            <h4>Code</h4>
            <pre>{selected.code}</pre>

            <h4>Analysis</h4>
            <pre>{selected.result}</pre>

          </div>
        ) : (
          <p>Select a history item</p>
        )}

      </div>

    </div>

  );

}