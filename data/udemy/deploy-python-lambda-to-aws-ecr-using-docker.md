---
title: Deploy Python Lambda to AWS ECR using Docker
excerpt: 'A python lambda is the easiest way to start exploring the AWS ecosystem.'
publishedTime: '2022-07-23T00:00:00'
modifiedTime: '2023-07-22T23:35:51'
author: 'Meher Howji'
tags: 'cloud'
draft: 'false'
publishTo: meherhowji.com
---

The first thing we need to have is access to AWS. You will have to sign up and provide your credit card details for account creation. AWS Lambda is essentially a language-specific environment that runs in an execution environment called runtime. This runtime passes events, context information and responses between other
lambdas as well.

### Install Python & PIP

Python should be most probably installed on your computer. You can test by running
`python --version` or `python3 --version`. Or, you can install Python from [here](https://www.python.org/downloads/).

Try running `pip --version` if it's installed, if not then you can install it from [here](https://pip.pypa.io/en/stable/installation/).

### Installing Docker

I installed Docker on my iMac using the GUI package as it would handle setting all the configurations
and paths correctly. If the GUI installer doesn't work then try the CLI installer. Download Docker [here](https://docs.docker.com/desktop/).

### Installing AWS CLI

We would need the AWS CLI to push the docker container to the AWS ECR which is just a registry or
repository for storing the images. Download the GUI installer from [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). This completes our setup.

## Building the App

### Create a Dockerfile

```docker title="Dockerfile"
# source the base image
FROM public.ecr.aws/lambda/python:3.9

# copy function code
COPY app.py ${LAMBDA_TASK_ROOT}

# each required library is listed as a separate line
COPY requirements.txt  .
RUN  pip3 install -r requirements.txt

# set the cmd to the handler
CMD ["app.handler"]
```

### Create a Lambda Function

We will create a simple function that returns the parameter it receives. This way we can know the information our lambda function receives when it is invoked. Also, we create a requirements.txt and add `jsonpickle` as a dependency.

- **Event** is a dict that contains the parameters which are sent when the function is invoked
- **Context** param is the context in which the function is called

```python title="app.py"
# We are referring to the filename and function
# name in Dockerfile's CMD statement ["<filename>.<function-name>"]
import jsonpickle

def handler(event, context):
	return {
		"EVENT": jsonpickle.encode(event),
		"CONTEXT": jsonpickle.encode(context)
	}
```

```txt title="requirements.txt"
jsonpickle==1.3
```

## Running Lambda Container Locally

### Build

```shell
docker build -t <container-name> .
```

e.g. if we name our container raring-rusty then the cmd will look like this:

```shell
docker build -t raring-rusty .
```

After the build is complete, we can quickly verify by hitting the following command.

```shell
docker images
```

It should output something like this:

```shell
➜ docker images
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
raring-rusty   latest    a0ea76e99b97   1 minute ago   595MB
```

Before we can run the docker, we have to install a Runtime Interface Client which defines an HTTP
interface for runtimes to receive invocation events from Lambda and respond.

## Testing Lambda Invocation

### Install RIC

We need this package to allow your code to interact with the Lambda service.

```shell
pip install awslambdaric
```

Now, let's run the docker image locally to verify if it is working ok.

```shell
# docker run -p 9000:8080 <container-name>:latest
docker run -p 9000:8080 raring-rusty:latest
```

### Using Postman

You can install Postman(a dev tool for making HTTP requests) from [here](https://www.postman.com/) and test the lambda function before deploying it to AWS ECR.

### URL

```url
http://localhost:9000/2015-03-31/functions/function/invocations
```

### Method

```txt
POST
```

### Body -

- Select `raw` as the body type and `json` as the format

```json
{ "is_cat": "true" }
```

### Authorization

```txt
No Auth
```

### Using CURL

```shell
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"is_cat":"true"}'
```

### Result

At this point, you should get a response back from your lambda function. Mine looked like the below:

```json
{
  "EVENT": "{\"is_cat\": \"true\"}",
  "CONTEXT": "{\"_epoch_deadline_time_in_ms\": 1657690206053, \"aws_request_id\": \"048c7493-7487-4af8-9b28-6a774ccfad8c\", \"client_context\": null, \"function_name\": \"test_function\", \"function_version\": \"$LATEST\", \"identity\": {\"cognito_identity_id\": null, \"cognito_identity_pool_id\": null, \"py/object\": \"awslambdaric.lambda_context.CognitoIdentity\"}, \"invoked_function_arn\": \"arn:aws:lambda:us-east-1:012345678912:function:test_function\", \"log_group_name\": \"/aws/lambda/Functions\", \"log_stream_name\": \"$LATEST\", \"memory_limit_in_mb\": \"3008\", \"py/object\": \"awslambdaric.lambda_context.LambdaContext\"}"
}
```

## Pushing to ECR

Pushing to ECR takes a few steps, I usually have static parts of the commands in my `zsh_aliases` file to speed up the dev. Because some of the docker commands are quite lengthy.

#### Build the Docker Image

```shell
docker build -t raring-rusty .
```

#### Authenticate ECR

Replace the aws_account_id with your account ID and region. A simpler way is to go to the AWS ECR page and create a new repository, then copy the URL from the URI column in the table.

```shell
aws ecr get-login-password --region region | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

If this runs well, you should see a response of `Login Succeeded`

#### Tag the Docker Image

In your ECR repository, the image tag is a good way to identify what change you have probably pushed or you can use the tag name in all sorts of creative ways too. When I am collaborating with someone on the same repository, I tag the image with my initials to know which ones contain my changes. Or you can use tag names to individually identify different components you are pushing, e.g. you have multiple lambdas etc.

```shell
# fetch the docker image id by running docker images e.g. e9ae3c220b23 or raring-rusty:latest
# Copy the URL of the repo from the ECR page or create your own, but make sure the repository exists.
# add the tag of your choice
docker tag <docker-image-id> <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<your-repository-name>:<tag>
```

After running this, when you run `docker image` you should see another image showing up the URL as the image name with the tag you just created.

## Final Push

We now push the docker image using the `docker push` command. Some basic fails on this command arise from the repository not being created or having incorrect AWS credentials in your ~/.aws/credentials file. And lastly, you can verify the upload by going to the AWS ECR portal.

```shell
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<your-repository-name>:<tag>

#outputs
The push refers to a repository [12341234.dkr.ecr.ap-south-1.amazonaws.com/my-repo]
095805977547: Layer already exists
3aaa42118c17: Layer already exists
d36909758ca1: Layer already exists
12b130f8cdef: Layer already exists
2140a70c0132: Layer already exists
11b26d093gcd: Layer already exists
42c27e6des9c: Layer already exists
60beda9b7a8d: Layer already exists
baef07789503: Layer already exists
my-tag: digest: sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxx09ec3 size: 2205
```
