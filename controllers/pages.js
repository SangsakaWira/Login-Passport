// router.get("/auth",pagesController.getAuthPage)
// router.get("/dashboard",pagesController.getDashPage)

exports.getAuthPage = (req,res)=>{
    res.render("auth")
}

exports.getDashPage = (req,res)=>{
    res.render("dash")
}