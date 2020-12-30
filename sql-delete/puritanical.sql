delete from "films"
  where "categories" != 'G'
  returning *;