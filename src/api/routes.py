"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

  

@api.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    fields = ["email", "password", "is_active"]

    print(fields)

    for field in fields:
        if field not in data:
            return jsonify({"msg": f"Falta el campo: {field}"}, 400)

    try:
        newUser = User (
            email = data["email"],
            password = data["password"],
            is_active = data["is_active"]
        )
        db.session.add(newUser)
        db.session.commit()

        return jsonify({"msg": "usuario creado exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"error agregando nuevo usuario a la base de datos: {e}"}), 500