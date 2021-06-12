import puppeteer from 'puppeteer';

 function marcadorPonto (){

    //A cada 30 minutos
    setInterval(() =>{
        const date = new Date();
        const horario:number = date.getHours() + date.getMinutes();

        const dia_semana = date.getDay();

        //Apenas os dias da semana.
        if(dia_semana != 0 && dia_semana != 6){
            if(horario => 0800 && horario <= 0829){
                robo();
            };
        };

    },1800000);
 }

 async function robo () {

    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
   
    //Vai para a página de login.
    //Pra não dar problema pra mim, escondi a url que faz isso pra mim.
    await page.goto(process.env.url);
   
    //Loga com meu user.
    await page.type('#m_usuario', process.env.email);
    await page.type('#m_senha', process.env.pwd);

    //Clica no LOGAR
    await page.click('input[type="submit"]'); 

    //Vai para o botão de marcação de ponto
    await page.goto('/folha/portal/Marcacao.aspx?Grupo=Portal');

    //Marca o ponto pra mim.
    //Beijos.
    await page.click('input[type="submit"]');

}

marcadorPonto();