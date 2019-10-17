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
  `
};
