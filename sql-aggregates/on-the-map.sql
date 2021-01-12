select "c"."name" as "country",
    count("cities"."name") as "Total Cities"
from "countries" as "c"
join "cities" using ("countryId")
group by "c"."name";