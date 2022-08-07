import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator";
import Pet from "App/Models/Pet";

export default class PetsController {
  public async index() {
    return Pet.all()
  }

  public async store({ request }: HttpContextContract) {
    const petSchema = schema.create({
      name: schema.string({ trim: true })
    })
    const payload = await request.validate({ schema: petSchema });
    const pet = await Pet.create(payload);

    return {
      message: 'Pet created',
      data: pet
    }
  }

  public async show({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    return {
      message: 'Pet fetched',
      data: pet
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    pet.name = request.body().name;
    await pet.save();

    return {
      message: 'Pet updated',
      data: pet
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    await pet.delete()
    return {
      message: "Pet deleted",
      data: {}
    }
  }
}
