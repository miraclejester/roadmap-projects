const apiResponse = {
    data: [
        {
            id: 'a1',
            title: 'Learning JavaScript',
            status: 'published',
            author: { name: 'Ava Stone' },
            stats: { views: 1200 },
        },
        {
            id: 'a2',
            title: 'Draft Notes',
            status: 'draft',
            author: { name: 'Noah Kim' },
            stats: { views: 50 },
        },
        {
            id: 'a3',
            title: 'Async Basics',
            status: 'published',
            author: { name: 'Mina Patel' },
            stats: { views: 900 },
        },
    ],
    meta: {
        total: 3,
    },
};

function getPublishedArticles(response) {
    return response.data.filter((article) => article.status === 'published');
}

function toArticleSummary(article) {
    return {
        id: article.id,
        title: article.title,
        authorName: article.author.name,
        views: article.stats.views
    }
}

function normalizeArticles(response) {
    const publishedArticles = getPublishedArticles(response);
    return publishedArticles.map((article) => toArticleSummary(article));
}

const responseData = document.querySelector('#response-data');
responseData.textContent = JSON.stringify(apiResponse);

const normalizeButton = document.querySelector('#normalize-button');
const normalizedList = document.querySelector('#normalized-list');
normalizeButton.addEventListener('click', () => {
    const normalizedData = normalizeArticles(apiResponse);
    const elements = [];
    for (const article of normalizedData) {
        const articleElement = document.createElement('p');
        articleElement.textContent = `ID: ${article.id}. Title: ${article.title}. Author: ${article.authorName}. Views: ${article.views}`;
        elements.push(articleElement);
    }
    normalizedList.replaceChildren(...elements);
});