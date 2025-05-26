import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRecoveryEmail = async (email: string, code: string) => {
  console.log("Tentando enviar email para:", email);
  console.log("Código de recuperação:", code);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de Verificação - AquaTrace",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #071025;">Código de Verificação</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha no AquaTrace.</p>
        <p>Seu código de verificação é:</p>
        <div style="background-color: #0A1538; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; border-radius: 5px;">
          ${code}
        </div>
        <p>Este código expirará em 10 minutos.</p>
        <p>Se você não solicitou esta alteração, por favor ignore este email.</p>
        <p>Atenciosamente,<br>Equipe AquaTrace</p>
      </div>
    `,
  };

  try {
    console.log("Configurações do email:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Erro ao enviar email de recuperação");
  }
};
