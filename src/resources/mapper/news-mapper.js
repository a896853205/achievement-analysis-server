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
    uuid, type, createTime, comeFrom, viewTimes, title
    FROM
    t_news
    WHERE
    type = ?
    ORDER BY
    createTime
    DESC
    LIMIT 
    ?
  `
};
