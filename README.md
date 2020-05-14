# mailer

testing tls, included a self signed cert
run the client with this env variable
`NODE_TLS_REJECT_UNAUTHORIZED=0`

## SMTP Response Codes from and it's Definition:
```
220 - SMTP Service ready.
221 - Service closing.
250 - Requested action taken and completed.
251 - The recipient is not local to the server, but the server will accept and forward the message.
252 - The recipient cannot be verified, but the server accepts the message and attempts delivery.
354 - Start message input and end with .. This indicates that the server is ready to accept the message itself (after you have told it who it is from and where you want to to go).
421 - The service is not available and the connection will be closed.
450 - The requested command failed because the user's mailbox was unavailable (for example because it was locked). Try again later.
451 - The command has been aborted due to a server error. Not your fault. Maybe let the admin know.
452 - The command has been aborted because the server has insufficient system storage.
500 - The server could not recognize the command due to a syntax error.
501 - A syntax error was encountered in command arguments.
502 - This command is not implemented.
503 - The server has encountered a bad sequence of commands.
504 - A command parameter is not implemented.
521 - This host never accepts mail; a response by a dummy server.
541 - The message could not be delivered for policy reasons—typically a spam filter. (Only some SMTP servers return this error code.)
550 - The requested command failed because the user's mailbox was unavailable (for example because it was not found, or because the command was rejected for policy reasons).
551 - The recipient is not local to the server. The server then gives a forward address to try.
552 - The action was aborted due to exceeded storage allocation.
553 - The command was aborted because the mailbox name is invalid.
554 - The transaction failed. Blame it on the weather.
555 - The server does not recognize the email address format, and delivery is not possible.
556 - The message would have to be forwarded, but the receiving server will reject it.
```
