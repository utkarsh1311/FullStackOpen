const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	let sum = 0;
	for (blog of blogs) {
		sum += blog.likes;
	}

	return sum;
};

const favoriteBlog = blogs => {
	let maxLikes = 0;
	let favBlog = {};
	for (blog of blogs) {
		if (blog.likes > maxLikes) {
			maxLikes = blog.likes;
			favBlog = blog;
		}
	}
	return favBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
