import { db } from "@/lib/db";

const SearchPage = async () => {
    const categories = await db.category.findMany({
        orderBy:{
            name: "asc"
        }
    });
    
    return ( 
        <div>
            This is a search page
        </div>
     );
}
 
export default SearchPage;