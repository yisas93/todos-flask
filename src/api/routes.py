"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Todos
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/todos/<int:user_param>', methods=['GET'])
def get_todos(user_param):
    todos=Todos.query.filter(Todos.user_id==user_param).all()
    user_data=todos[0].user.serialize()
    return jsonify({
        "user": user_data,
        "todos": list(map(lambda item: item.serialize(),todos))
    }) , 200

@api.route('/todos/<int:user_param>', methods=['POST'])
def post_todo(user_param):
    label=request.json.get("label")
    done=request.json.get("done")
    new_todo=Todos(user_id=user_param, label=label, done=done)
    db.session.add(new_todo)    
    db.session.commit()
    return jsonify({"resp":"todo creado con exito"}),201



@api.route('/todos/<int:user_param>/<int:todo_index>', methods=["PUT"])
def update_todo(user_param, todo_index):
    label=request.json.get("label")
    done=request.json.get("done")
    todos=Todos.query.filter(Todos.user_id==user_param).all()
    new_todo=todos[todo_index]
    new_todo.label=label
    new_todo.done=done
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({
        "resp": "todo actualizado con exito"
    }), 200



@api.route('/todos/<int:user_param>/<int:todo_index>', methods=["DELETE"])
def delete_todo(user_param, todo_index):
    todos=Todos.query.filter(Todos.user_id==user_param).all()
    new_todo=todos[todo_index]
    db.session.delete(new_todo)
    db.session.commit()
    return jsonify({"resp": "todo eliminado exitosamente"}), 200


@api.route('/todos/signup', methods=['POST'])
def signup():
    email=request.json.get("email")
    password=request.json.get("password")
    signup=User(email=email, password=password)
    users = User.query.filter(User.email == email).first()

    if users != None:
        return jsonify({"msg": "User already exist"}), 404

    db.session.add(signup)
    db.session.commit()

    return jsonify({"msg": "User created succefully"}), 201
    
# LOGIN USER ✔️
@api.route("/todos/login", methods=["POST"])
def user_login():
    email = request.json.get("email")
    password = request.json.get("password")
    # user = User.query.filter(User.email == email).first()
    user = User.query.filter(User.email == email).first()
    # No encuentro Usuario

    if user == None:
        return jsonify({"msg": "invalid login"}), 401
    elif user.password != password:
        return jsonify({"msg": "invalid login"}), 401
    else:
        return jsonify( {"success": "User login successfully",}),200
        

    