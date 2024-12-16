import ArtModel from "../model/art.js"


export const getArt = async () => {
    const art = await ArtModel.find().populate("user")
    return art

}

export const addArt = async (name, description, cover, userId) => {
    console.log(userId, "user id")
    const art = new ArtModel({
        name: name,
        description: description,
        cover: cover,
        user: userId
    })
    await art.save()
    await art.populate("user")
    return art
}

export const like = async (userId, artId) => {
    const art = await ArtModel.findById(artId)
    if (art.likes.includes(userId)) {
        art.likes = art.likes.filter((f) => f.toString() != userId.toString())
        await art.save()

    }
    else {
        art.likes.push(userId)
        await art.save()

    }
    return art

}

export const comment = async (userId, artId, text) => {
    const art = await ArtModel.findById(artId).populate("user")
    art.comments.push({
        user: userId,
        text,
        createdAt: Date.now()
    })
    await art.save()
    await art.populate("comments.user")
    return art
}