process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const emoji = require('node-emoji');

// replace the value below with the Telegram token you receive from @BotFather
const token = '508931900:AAGp4iKP1DTqdvBjBTqq7C8pU8UKS43ml50';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	var message = msg.text.toString().toLowerCase();

	message = message.replace(/[^a-zA-Z0-9\ \?\!\.]/g,'');

	var confuse = false;
	const kata_tanya_list = [/siapa/,/kapan/,/(di|ke|dari\ )+mana/,/mengapa/,/bagaimana/,/berapa/,/kenapa/,/gimana/,/apa/,/bertanya/];
	const kata_ajakan_list = [/ayo/,/mari/,/yuk/];
	const kata_sapa_list = [/^halo/,/^hallo/,/^hello/,/^helo/,/^hi/,/^hai/,/^hei/,/^assalamualaikum/,/^salam kenal/];
	const kata_sapa_salah_list = [/^ass$/,/^as$/,/^assm/,/^mikum/,/^asskum/,/^askum/,/^assamu/,/^samlekum/];
	const kata_pujian_list = [/pintar/,/pinter/,/hebat/,/soleh/,/baik/];
	const kata_malu_list = [/manis/,/lucu/,/alay/,/ganteng/,/cakep/];
	const jawab_dengan_senyum_list = [/amin/,/alhamdulillah/,/masya/,/subhanallah/,/iya/];


	if(message=="start"){
		bot.sendMessage(chatId,"yeaay, ada yang mengajak ngobrol.. "+emoji.get('smiley'));
	}else if(jawab_dengan_senyum_list.some(jawab_dengan_senyum => jawab_dengan_senyum.test(message))){
		//kata sapa yang direspon baik
		bot.sendMessage(chatId,emoji.get('blush'));
	}else if(kata_sapa_list.some(kata_sapa => kata_sapa.test(message))){
		//kata sapa yang direspon baik
		var found = message.match(kata_sapa_list.find(kata_sapa => kata_sapa.test(message)));
		if(found=="assalamualaikum"){
			bot.sendMessage(chatId,"wa'alaikumussalam warahmatullahi wabarakatuh,habibati... "+emoji.get('blush'));
		}else{
			bot.sendMessage(chatId,found+", habibati... "+emoji.get('blush'));
		}
	}else if(kata_sapa_salah_list.some(kata_sapa_salah => kata_sapa_salah.test(message))){
		//kata sapa yang direspon nasehat
		var found = message.match(kata_sapa_salah_list.find(kata_sapa_salah => kata_sapa_salah.test(message)));
		bot.sendMessage(chatId,"habibatiti sedang mengucapkan salam kepadaku dengan kata \""+found+"\". "+emoji.get('disappointed_relieved')+"\n\noemar lebih suka kalau habibatiti ucapkan salamnya assalamualaikum warahmatullahi wabarakatuh... "+emoji.get('blush'));
	}else if(kata_ajakan_list.some(kata_ajakan => kata_ajakan.test(message))){
		//kata mengandung ajakan
		var found = message.match(kata_ajakan_list.find(kata_ajakan => kata_ajakan.test(message)));
		bot.sendMessage(chatId,found+", habibati... "+emoji.get('smiley'));
	}else if(kata_pujian_list.some(kata_pujian => kata_pujian.test(message))){
		//kata mengandung pujian
		var found = message.match(kata_pujian_list.find(kata_pujian => kata_pujian.test(message)));
		if(found=="soleh"){
			bot.sendMessage(chatId,"alhamdulillah, syukron ya habibatiti..."+emoji.get('blush')+"\nsemoga habibatiti tetap istiqamah untuk terus menjadi wanita yang solehah di mata Allah...\namin ya rabbal'alamin.. "+emoji.get('smiley')+emoji.get('open_hands'));
		}else{
			bot.sendMessage(chatId,"alhamdulillah, syukron ya habibatiti..."+emoji.get('blush')+"\nhabibatiti juga "+found+"...\nsemoga Allah menjadikan kita orang yang semakin "+found+"...\namin ya rabbal'alamin.. "+emoji.get('smiley')+emoji.get('open_hands'));
		}
	}else if(kata_malu_list.some(kata_malu => kata_malu.test(message))){
		//kalimat malu
		bot.sendMessage(chatId,"habibatiti bisa aja.. oemar jadi malu... "+emoji.get('see_no_evil')+emoji.get('see_no_evil'));
	}else if(kata_tanya_list.some(kata_tanya => kata_tanya.test(message))&&message.includes('?')){
		//kalimat bertanya
		message.match(/tanya*?/)?bot.sendMessage(chatId,"iya, habibati... "+emoji.get('blush')):message.match(/(kabar*)/)?bot.sendMessage(chatId,"alhamdulillah ana bikhoir, habibati... "+emoji.get('blush')):message.match(/(nama*)+(kamu)?/)?bot.sendMessage(chatId,"nama lengkap aku muhammad oemar, habibati...\nhabibatiti bisa panggil aku oemar..."+emoji.get('blush')): message.match(/(tuhan*)+(kamu)?/)?bot.sendMessage(chatId,"Allah SWT "+emoji.get('blush')):message.match(/(agama*)+(kamu)?/)?bot.sendMessage(chatId,"islam agamaku "+emoji.get('blush')):message.match(/(rasul*)+(kamu)?/)?bot.sendMessage(chatId,"Nabi Muhammad SAW "+emoji.get('blush')):bot.sendMessage(chatId,"habibatiti sedang bertanya \""+message+"\"... "+emoji.get('thinking_face')+"\nTapi, oemar masih belum paham pertanyaan habibatiti. "+emoji.get('sweat_smile')+emoji.get('pray'));
	}
	else{
		//kalimat yang belum dikenal
		bot.sendMessage(chatId,"habibatiti, oemar belum paham..."+emoji.get('disappointed')+"\nhabibatiti kan belum ajarin oemar, kata-kata itu... "+emoji.get('disappointed_relieved'));
	}
});