import { MikroORM} from "@mikro-orm/core"

async function main(){
    const orm = await MikroORM.init({
        dbName: '',
        type: 'postgresql',
        debug: process.env.NODE_ENV !== 'production'
    })

}



main()