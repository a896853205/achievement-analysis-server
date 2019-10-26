export default {
  selectNewsByUuid: `
    SELECT
    *
    FROM
    t_news
    WHERE
    uuid = ?
    `,
  updatePlusOneNewsViewTimes: `
    UPDATE
    t_news
    SET
    viewTimes = viewTimes + 1
    WHERE
    uuid = ?
  `,
  queryNewsProfileByType: `
    SELECT
    uuid, type, createTime, comeFrom, viewTimes, title,profilePicUrl
    FROM
    t_news
    WHERE
    type = ?
    ORDER BY
    createTime
    DESC
    LIMIT 
    ?
  `,
  queryHotNewsProfile: `
    SELECT
    uuid, type, createTime, comeFrom, viewTimes, title,profilePicUrl
    FROM
    t_news
    ORDER BY
    viewTimes
    DESC
    LIMIT 
    10
  `,
  queryMoreNews: `
    SELECT
    uuid, type, createTime, comeFrom, viewTimes, title,profilePicUrl
    FROM
    t_news
    WHERE
    type = ?
    ORDER BY
    viewTimes,createTime
    DESC
    LIMIT 
    ?,20
  `,
  queryAllNewsByType: `
    SELECT
    *
    FROM
    t_news
    WHERE
   type = ?
    `,

  queryAllNewsNumByType: `
    SELECT
    COUNT(*) as totalNum
    FROM
    t_news
    WHERE
    type = ?
  `,
  
};
