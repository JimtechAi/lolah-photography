const { loadEnvConfig } = require('@next/env');
const { v2: cloudinary } = require('cloudinary');
loadEnvConfig(process.cwd());
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
(async()=>{
  try {
    const res=await cloudinary.api.resources_by_asset_folder('lolah photography/Birthday Photography',{resource_type:'image',type:'upload',max_results:5});
    const out=(res.resources||[]).map(r=>({public_id:r.public_id,resource_type:r.resource_type,format:r.format,width:r.width,height:r.height,secure_url:r.secure_url}));
    console.log(JSON.stringify(out,null,2));
  } catch (e) {
    console.log(JSON.stringify({error:e?.error?.message||e?.message||String(e),code:e?.error?.http_code||null},null,2));
  }
})();
