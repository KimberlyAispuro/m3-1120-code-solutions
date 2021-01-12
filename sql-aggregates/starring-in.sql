select "c"."name" as "category",
    count(*) as "Total Movies"
from "films"
join "filmCategory" using ("filmId")
join "categories" as "c" using ("categoryId")
join "castMembers" using ("filmId")
join "actors" using ("actorId")
where "actors"."firstName" = 'Lisa' 
and "actors"."lastName" = 'Monroe'
group by "c"."name";