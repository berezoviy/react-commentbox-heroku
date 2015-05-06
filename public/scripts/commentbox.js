var CommentList = React.createClass({
  render: function(){
    return(
        <div className="commentList">
          Heeelloo. Comment List.
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
    return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          {this.props.children}
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
