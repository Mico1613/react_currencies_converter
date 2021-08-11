import React from "react";
type props = {
  currencies: object;
};
function Currencies({ currencies }: props) {
  function colorHandler(item: any) {
    if (
      (item.Value / item.Nominal).toFixed(4) >
      (item.Previous / item.Nominal).toFixed(4)
    ) {
      return "#FAC2BA";
    } else if (
      (item.Value / item.Nominal).toFixed(4) ===
      (item.Previous / item.Nominal).toFixed(4)
    ) {
      return "#E1E3E4";
    } else if (
      (item.Value / item.Nominal).toFixed(4) <
      (item.Previous / item.Nominal).toFixed(4)
    ) {
      return "#97F0AA";
    }
  }
  return (
    <div>
      <ul
        style={{
          maxHeight: "780px",
          overflow: "auto",
          border: "1px solid grey",
          borderRadius: "2px",
          padding: "5px",
          paddingBottom: "0px",
        }}
      >
        {Object.values(currencies).map((item, index) => {
          return (
            <li
              key={`${item}_${index}`}
              style={{
                border: "1px solid #000",
                marginBottom: "5px",
                borderRadius: "5px",
                display: "flex",
              }}
            >
              <span
                title={item.Name}
                style={{
                  cursor: "default",
                  padding: "5px",
                  flex: "0 1 283px",
                }}
              >
                {item.CharCode}
              </span>
              <span
                title={`Предыдущее значение: ${(
                  item.Previous / item.Nominal
                ).toFixed(4)}`}
                style={{
                  backgroundColor: colorHandler(item),
                  cursor: "default",
                  padding: "5px",
                  flex: "0 0 100px",
                  textAlign: "center",
                  marginRight: "5px",
                }}
              >
                {(item.Value / item.Nominal).toFixed(4)}
              </span>
              <div
                title="ID"
                style={{
                  flex: "1 0",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    cursor: "default",
                    padding: "5px",
                    flex: "0 1 85px",
                  }}
                >
                  {item.ID}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Currencies;
