import React from "react";
import { List, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
function CatalogList(props) {
  const {
    loading,
    data,
    jump,
    history: { push },
    match
  } = props;
  return (
    <div>
      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Icon type="loading" />
        </div>
      )}
      <List>
        {data.map(({ chapter_name, chapter_id }, i) => (
          <List.Item
            arrow="horizontal"
            onClick={() => {
              const id = match.params.id;
              jump && push(`/detail/${id}/${chapter_id}`);
            }}
            key={i}
            // extra={extra ? auth : ""}
          >
            {chapter_name}
          </List.Item>
        ))}
      </List>
    </div>
  );
}
export default withRouter(CatalogList);
