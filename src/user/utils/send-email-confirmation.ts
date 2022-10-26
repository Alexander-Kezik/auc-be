import * as nodemailer from 'nodemailer';

export const sendConfirmationEmail = (name: string, email: string, confirmationCode: string): void => {
	const transport = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	transport
		.sendMail({
			from: process.env.EMAIL_ADDRESS,
			to: email,
			subject: 'Подтверждение аккаунта',
			html: `
				<h1>Подтверждение почты</h1>
				<h2>Привет ${name}</h2>
				<p>Спасибо, что зарегистрировались на нашем сайте. Пожалуйста, подтвердите, что вы действительно регистрировались, нажав на кнопку ниже. Если вы ничего не делали, то проигнорируйте данное сообщение...</p>
					<a style='text-decoration: none; color: white; padding: 10px; background: orange; border: none; box-shadow: 3px 3px 3px black; border-radius: 4px; margin: 0 auto 10px; display: inline-block;' href='http://localhost:8000/users/confirm-email/${confirmationCode}'>Подтвердить</a>
			`
		})
		.catch(err => console.log(err));
};
