select "c"."firstName" as "First Name",
       "c"."lastName" as "Last Name",
    sum("p"."amount") as "Total paid"
from "customers" as "c"
join "payments" as "p" using ("customerId")
group by "customerId"
order by "Total paid" desc;
