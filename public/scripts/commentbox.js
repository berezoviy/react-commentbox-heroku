var data = [
  {author: "Martin", text: "You'll die!"},
  {author: "Tirion", text: "Fuck you, bitch!"}
];

var CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function(comment) {
      return(
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
        )
    })
    return(
        <div className="commentList">
          {commentNodes}
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
          <CommentList data={this.props.data} />
          <CommentForm />
        </div>
      );
  }
});
React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
  );
