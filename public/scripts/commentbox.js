var CommentList = React.createClass({
  render: function(){
    return(
        <div className="commentList">
          <Comment author="Example exapme">This is one comment</Comment>
          <Comment author="Example1 some">This is *another* comment</Comment>
        </div>
      );
  }
});

var CommentForm = React.createClass({
  render: function(){
    return (
        <div className="commentForm">
          Comment Form.
        </div>
      )
  }
});

var Comment = React.createClass({
  render: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      );
  }
});

var CommentBox = React.createClass({
  render: function(){
    return (
        <div className="commentBox">
          Hello, retards! I am crazy Comment Box.
          <h1>Comments</h1>
          <CommentList />
          <CommentForm />
        </div>
      );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
  );
