import React, { useState } from 'react';
import styles from "./ColumnDetailPage.module.css";
import "../ColumnDetailPage/ReactQuillStyle.css"

const ColumnDetailPage = ()=>{
  const [columnData, setColumnData] = useState({
    title:"COLUMN_TITLE",
    content:'<h1 class="ql-align-center"><strong>이것은 리엑트 quill입니다.</strong></h1><p class="ql-align-center"><br></p><ul><li><strong class="ql-size-large">다음 기능이 가능합니다</strong></li></ul><ol><li>텍스트 에디터 생성</li><li>이미지 삽입도 가능함.</li><li><em>이텔릭체 가능함</em></li><li><strong>볼드체 가능함</strong></li><li><u>밑줄 생성 가능</u></li></ol><p class="ql-align-center"><img src="data:image/png;base64,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VqvGghsvjv59GuNtePsctF/84B+nRbXafFeQNoLWcSfGVWe0lj2jx5h55mR/+6+jWq0a/+27l0Wffo31NrLsnd4t+8ecmz/VtPffTRcAERFDB/WOe2+5LIYP7lPqjhFD+sRPvvfp0nc0u2umTosZZ04ue0bDm3nWlPjqlAvLntH0Bg3pE99vuzKGDO1b9hS64NBh/WLeD6c39eexKQMgImLM4QPjoflXxCemnhi1Wvf+Z9Zq1bj0IyfFQ/OviKMP9xp1vVUrlZg1dVos/MwXXROwG6P6D4y2y6+Oa879eFSb8GuZG9HoIwfFovu+FOd//JRuv/+ha2q1alww7ZRYdN/V8Z4jBpU9p64qEdFZ5IGdK24o8rhCrFi9KW770bK452dPxqr2rbFhy0uFvr1jrVaNg/scEMMHt8QZfzU6zjtrbOlX/O9O5fArCj2vc+6iQs8rwqsdHdG29IFYtOzBWPLsymjfurkhrlfoTvvv+84Y3NI3xg8dGZPGnRgTx54Q+9RqZc96k8rFEws9b/W2mwo9ryirnt4Qdy18OH563/J47tnNsXnTi0379rI9Ua1Wjb79DowhQ/vGqacfHR9undCwV/wP631poeelCABekyEA6DmyBAAUpegA8NwUACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAlVIqKz7BEAQPfyDAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAn1KvrAzn87vegjKUjl1HsLPa/zwr8t9DxyqXz37wo97+G15xd6HjSaCYPmFXqeZwAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACAhAQAACQkAAEhIAABAQgIAABISAACQkAAAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhAQAACQkAAAgIQEAAAkJAABISAAAQEICAAASEgAAkJAAAICEBAAAJCQAACChSkR0lj0CAOhengEAgIQEAAAkJAAAICEBAAAJCQAASEgAAEBCAgAAEhIAAJCQAACAhKoRsb3sEQBAt3qxGhHryl4BAHSrddWIWFL2CgCgWz1SjYi2slcAAN1qUSUi9omIX0XEqJLHAAD190xEHFGNiFcjYmbJYwCA7vH5iNhR+/3/+XVE7B8RJ5e3BwCos1kRMSciovZHP3hfRLw7Iv6yjEUAQF3NjoirI6Iz4vUB0BkRiyPi0Yg4LiJaun0aAFC0pyPi4oi4MX7/4B8RUfkTP3mfiJgUERMjYnxEDI7XXiIAABrb9ohoj9e+zL8tIhbFa9f7vc7/AwWPPgNODr3XAAAAAElFTkSuQmCC"></p>'
  });

  return(
    <div className={styles.background}>
      <div className={styles.columnHeader}>
        <img src='' alt=''></img>
        <span className={styles.columnTItle}>{columnData.title}</span>
      </div>
      <div
        dangerouslySetInnerHTML={{__html:columnData.content}}
        className="ql-editor"
      />
    </div>
  )
}

export default ColumnDetailPage;