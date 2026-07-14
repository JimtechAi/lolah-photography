const { loadEnvConfig } = require('@next/env');
const { v2: cloudinary } = require('cloudinary');
loadEnvConfig(process.cwd());
const cloudName=(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME||process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDE_NAME||'').trim();
const apiKey=(process.env.CLOUDINARY_API_KEY||'').trim();
const apiSecret=(process.env.CLOUDINARY_API_SECRET||'').trim();
cloudinary.config({cloud_name:cloudName,api_key:apiKey,api_secret:apiSecret,secure:true});
const root='lolah photography';
const folders=['Hero','Logo','Weddings','Traditional','Engagements','Bridal Portraits','Maternity','Family','Birthday Photography','Baby And Newborn','Corporate Portraits','Events','Drones Photography And Videography'];
(async()=>{
  const out=[];
  for(const folder of folders){
    const path=`${root}/${folder}`;
    try{
      const res=await cloudinary.api.resources_by_asset_folder(path,{resource_type:'image',type:'upload',max_results:1});
      out.push({folder,exists:true,count:(res.resources||[]).length,publicId:res.resources?.[0]?.public_id||null});
    }catch(e){
      out.push({folder,exists:false,error:e?.error?.message||e?.message||String(e)});
    }
  }
  console.log(JSON.stringify(out,null,2));
})();
