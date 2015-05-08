var CommentList = React.createClass({
  render: function(){
    var comments = this.props.data.reverse();
    var commentNodes = comments.map(function(comment) {
      return(
        <Comment author={comment.author} key={comment.author} >
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
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  success: function(){
         Materialize.toast('Success.', 2000);
  },

  render: function(){
    var attributeId = "success";
    return (
      <div className="card form z-depth-5">
        <form className="commentForm right-align" name="CommentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" />
          <input type="text" placeholder="Message" ref="text" />
          <button type="submit" value="Post" className="btn waves-effect waves-light " id={attributeId} onClick={this.success.bind(this, attributeId)}>
            Post<i className="mdi-content-send right"></i>
          </button>
        </form>
        </div>
      )
  }
});

var Comment = React.createClass({
  render: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="row comment">
      <div className="col s12 ">
        <div className="card-panel z-depth-2">
          <span  dangerouslySetInnerHTML={{__html: rawMarkup}} />
                    <h6 className="commentAuthor right-align">
            {this.props.author}
          </h6>
        </div>
      </div>
    </div>

      );
  }
});

var CommentBox = React.createClass({
   loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
     this.loadCommentsFromServer();
     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function(){
    return (
        <div className="commentBox">
        <div className="row">
          <div className="col s12 m6">
            <h1>Comments</h1>
          </div>
          <div className="col s12 m6">
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
        </div>
          <CommentList data={this.state.data} />

        </div>
      );
  }
});
React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
  );
