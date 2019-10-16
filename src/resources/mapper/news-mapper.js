export default {
  selectNewsByUuid: `
    SELECT
    *
    FROM
    t_news
    WHERE
    uuid = ?
    `
};
