//TodoList组件,用于将新增和显示两个子组件集合在一起
var TodoList = React.createClass({
  //初始化化组件数据,数据交由state控制
  getInitialState: function(){
    return {
      todolist: []
    };
  },
  //主要处理函数,通过handleChange去更新数据,不管是新增还是删除都是都是自己先处理,再把处理完的数据传给父组件,再由父组件去更新数据,最后渲染.
  handleChange: function(date){
    this.setState({
      todolist: date
    });
  },

  render: function(){
    return (
      <div>
        <h1 className="todo_title">TodoList</h1>
        <TypeNew onAdd={this.handleChange} todo={this.state.todolist} />
        <ShowList todo={this.state.todolist} />
      </div>
    );
  }
})



//TypeNew组件,用于新增事务
var TypeNew = React.createClass({
  handleAdd: function(event){
    event.preventDefault();
    //获取dom元素,再获取输入数据
    var inputDom = this.refs.inputnew;
    var newthing = inputDom.value.trim();
    //获取原数据,推入新数据
    var date = this.props.todo;
    if (newthing !== '') {
      date.push(newthing);
      this.props.onAdd(date);
    }
    inputDom.value = '';
  },

  render: function(){
    return (
      <form onSubmit={this.handleAdd}>
        <input type="text" ref="inputnew" className="todo_new" placeholder="新增事务..." />
      </form>
    );
  }
})


//ShowList组件,用于显示以及删除事务
var ShowList = React.createClass({
  
  //删除事务
  handleDelete: function(event){
    var itemLi = event.target.parentNode;
    itemLi.style.display = "none";


  },
  
  //完成事务
  handleClick: function(event){
    var item  = event.target;
    var itemLi = event.target.parentNode;
    if (item.checked) {
      itemLi.setAttribute('class','todo_item hasDone');
    } else{
      itemLi.setAttribute('class','todo_item');
    }
    
  },
  render: function(){
    return (
      <ul className="todo_list">
        {
          this.props.todo.map(function(item,i){
            return (
              <li className="todo_item" ref="listItem" >
                <input type="checkbox" onClick={this.handleClick} className="complete" />
                <label>{item}</label>
                <button className="todo-delete" onClick={this.handleDelete}>delete</button>
              </li>
            );
          }.bind(this))
        }
      </ul>
    )
  }
})


ReactDOM.render(
  <TodoList />,
  document.getElementById('example')
)