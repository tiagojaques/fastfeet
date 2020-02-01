import * as Yup from 'yup';
import Recipients from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipients.findAll();
    console.log(recipient);
    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.number()
        .integer()
        .required(),
      address: Yup.string(),
      state: Yup.string()
        .max(2)
        .required(),
      city: Yup.string().required(),
      zip_code: Yup.number()
        .integer()
        .required(),
    });

    console.log(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      street,
      street_number,
      address,
      state,
      city,
      zip_code,
    } = await Recipients.create(req.body);

    return res.json({
      name,
      street,
      street_number,
      address,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.number()
        .integer()
        .required(),
      address: Yup.string(),
      state: Yup.string()
        .max(2)
        .required(),
      city: Yup.string().required(),
      zip_code: Yup.number()
        .integer()
        .min(8)
        .max(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      street,
      street_number,
      address,
      state,
      city,
      zip_code,
    } = await Recipients.update(req.body);

    return res.json({
      name,
      street,
      street_number,
      address,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
