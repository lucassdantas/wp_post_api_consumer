// URL da API do WordPress
const apiUrl = 'https://blog.casadoesteticista.com.br/wp-json/wp/v2/posts?_embed';
const postContainer = document.getElementById('post-container');
async function fetchPostData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados do post');
        }

        const post = await response.json();
        let postQuantity = 3
        if(post.length < 3) postQuantity = post.length
        for (let i = 0; i < (postQuantity); i++) {
            console.log(post[i])
            postContainer.innerHTML += `
                <div class='post'>
                <img src='${post[i]._embedded['wp:featuredmedia'][0].source_url}' class='postImage'>
                <h2>${post[i].title.rendered}</h2>
                <p>${post[i].excerpt.rendered}</p>
                <a href='${post[i].link}' class='postBtn'>Continuar lendo</a>
                </div>
            `;
        }
        // Inserir os dados do post no DOM
        
    } catch (error) {
        console.error(error);
        postContainer.innerHTML = 'Erro ao carregar os dados do post.';
    }
}

// Chamar a função para buscar os dados do post ao carregar a página
window.addEventListener('load', fetchPostData);