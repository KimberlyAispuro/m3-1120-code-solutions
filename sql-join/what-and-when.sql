select "releaseYear", "categories"."name"
from   "films"
join "filmCategory" using ("filmId")
join "categories" using ("categoryId")
where "title" = 'Boogie Amelie';