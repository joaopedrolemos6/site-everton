const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, company, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  // ===== NOVA CONFIGURAÇÃO DO TRANSPORTER COM DEBUG =====
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor SMTP do Gmail
    port: 465, // Porta para SSL
    secure: true, // Usar SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // As duas linhas abaixo irão mostrar toda a comunicação no terminal
    logger: true,
    debug: true,
  });
  // ===== FIM DA NOVA CONFIGURAÇÃO =====

  const mailOptions = {
    from: `"Formulário do Site" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // O email que vai receber a mensagem
    replyTo: email,
    subject: `Contato do Site: ${subject}`,
    html: `
      <h1>Nova Mensagem do Formulário de Contato</h1>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
      <p><strong>Email para Resposta:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <hr>
      <h3>Mensagem:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    // A resposta do envio terá informações detalhadas
    let info = await transporter.sendMail(mailOptions);
    console.log('Informações do Envio:', info);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('ERRO DETALHADO AO ENVIAR EMAIL (CATCH BLOCK):', error);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente mais tarde.' });
  }
};

module.exports = { sendContactEmail };